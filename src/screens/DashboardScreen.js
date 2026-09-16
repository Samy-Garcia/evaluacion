import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { ProfileHeader, InfoCard } from '../components/ProfileCard';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function DashboardScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Campos editables
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  const cargarDatos = useCallback(async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const refDoc = doc(db, 'usuarios', uid);
    const snap = await getDoc(refDoc);

    if (snap.exists()) {
      const data = snap.data();
      setUserData(data);
      setNombreCompleto(data.nombreCompleto || '');
      setFechaNacimiento(data.fechaNacimiento || '');
      setCarnet(data.carnet || '');
      setUrlImagen(data.urlImagen || '');
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await cargarDatos();
      setLoading(false);
    })();
  }, [cargarDatos]);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarDatos();
    setRefreshing(false);
  };

  const handleGuardar = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    setGuardando(true);
    try {
      await updateDoc(doc(db, 'usuarios', uid), {
        nombreCompleto,
        fechaNacimiento,
        carnet,
        urlImagen,
      });
      await cargarDatos();
      setEditando(false);
    } catch (err) {
      console.log('Error al actualizar datos:', err);
    } finally {
      setGuardando(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    // El listener en Navigation.js regresa automáticamente al Login
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileHeader
        imageUrl={editando ? urlImagen : userData?.urlImagen}
        name={userData?.nombreCompleto}
      />

      {!editando ? (
        <>
          <InfoCard label="Nombre completo" value={userData?.nombreCompleto} />
          <InfoCard label="Fecha de nacimiento" value={userData?.fechaNacimiento} />
          <InfoCard label="Carnet institucional" value={userData?.carnet} />
          <InfoCard label="Correo" value={userData?.email} />

          <CustomButton title="Editar información" onPress={() => setEditando(true)} />
          <CustomButton title="Cerrar sesión" onPress={handleLogout} variant="danger" />
        </>
      ) : (
        <>
          <CustomInput
            label="Nombre completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
          />
          <CustomInput
            label="Fecha de nacimiento"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
          />
          <CustomInput label="Carnet institucional" value={carnet} onChangeText={setCarnet} />
          <CustomInput
            label="URL de imagen de perfil"
            value={urlImagen}
            onChangeText={setUrlImagen}
          />

          <CustomButton title="Guardar cambios" onPress={handleGuardar} loading={guardando} />
          <CustomButton
            title="Cancelar"
            onPress={() => setEditando(false)}
            variant="secondary"
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
