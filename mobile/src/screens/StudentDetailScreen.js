import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { alunosAPI } from '../services/api';

export default function StudentDetailScreen({ route, navigation }) {
  const { studentId } = route.params;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    try {
      setError('');
      const response = await alunosAPI.getById(studentId);
      setStudent(response.data);
    } catch (error) {
      setError('Erro ao carregar dados do aluno.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Aluno',
      `Tem certeza que deseja excluir ${student.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await alunosAPI.delete(studentId);
              Alert.alert('Sucesso', 'Aluno excluído com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o aluno.');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadStudent}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: '#666', marginTop: 8 }]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Aluno não encontrado</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes do Aluno</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.studentName}>{student.nome}</Text>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>ID: {student.id}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Matrícula:</Text>
            <Text style={styles.value}>{student.matricula}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Curso:</Text>
            <Text style={styles.value}>{student.curso}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Turma:</Text>
            <Text style={styles.value}>{student.turma}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => Alert.alert('Info', 'Funcionalidade de edição em desenvolvimento')}
          >
            <Text style={styles.buttonText}>Editar Aluno</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={[styles.buttonText, styles.deleteButtonText]}>Excluir Aluno</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
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
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  idBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  idText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  actions: {
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});