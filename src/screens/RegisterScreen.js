import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function RegisterScreen({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(''); // formato: DD/MM/AAAA
  const [carnet, setCarnet] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');

    if (!nombreCompleto || !fechaNacimiento || !carnet || !email || !password) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const credenciales = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Guardar datos obligatorios del usuario en Firestore
      await setDoc(doc(db, 'usuarios', credenciales.user.uid), {
        nombreCompleto,
        fechaNacimiento,
        carnet,
        urlImagen: urlImagen || '',
        email: email.trim(),
        creadoEn: new Date().toISOString(),
      });

      // La navegación al Dashboard la maneja el listener de auth en Navigation.js
    } catch (err) {
       console.log('Código de error real:', err.code, err.message); // <- agrega esto
      setError(traducirError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

        <CustomInput
          label="Nombre completo"
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
          placeholder="Ej. Samy García"
          autoCapitalize="words"
        />
        <CustomInput
          label="Fecha de nacimiento"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          placeholder="DD/MM/AAAA"
        />
        <CustomInput
          label="Carnet institucional"
          value={carnet}
          onChangeText={setCarnet}
          placeholder="Ej. 20240012"
        />
        <CustomInput
          label="URL de imagen de perfil"
          value={urlImagen}
          onChangeText={setUrlImagen}
          placeholder="https://..."
        />
        <CustomInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
        />
        <CustomInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <CustomButton title="Registrarme" onPress={handleRegister} loading={loading} />

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function traducirError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Ese correo ya está registrado.';
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/weak-password':
      return 'La contraseña es muy débil.';
    default:
      return 'Ocurrió un error al registrarte. Intenta de nuevo.';
  }
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 24,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    fontSize: 13,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  linkBold: {
    color: colors.primary,
    fontWeight: '700',
  },
});
