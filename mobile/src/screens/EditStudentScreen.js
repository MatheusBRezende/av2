import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { alunosAPI } from '../services/api';

export default function EditStudentScreen({ route, navigation }) {
  const { student } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        nome: student.nome,
        turma: student.turma,
        curso: student.curso,
        matricula: student.matricula
      });
    }
  }, [student]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.turma || !formData.curso || !formData.matricula) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      await alunosAPI.update(student.id, formData);
      Alert.alert('Sucesso', 'Aluno atualizado com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('StudentDetail', { studentId: student.id })
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o aluno.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Aluno</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome completo *</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(text) => handleChange('nome', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Matrícula *</Text>
          <TextInput
            style={styles.input}
            value={formData.matricula}
            onChangeText={(text) => handleChange('matricula', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Curso *</Text>
          <TextInput
            style={styles.input}
            value={formData.curso}
            onChangeText={(text) => handleChange('curso', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Turma *</Text>
          <TextInput
            style={styles.input}
            value={formData.turma}
            onChangeText={(text) => handleChange('turma', text)}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.warningButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Atualizar Aluno</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginLeft: 16,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  warningButton: {
    backgroundColor: '#ffc107',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});