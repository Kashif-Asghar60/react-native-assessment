import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { goalService } from '../services/api';

export default function HomeScreen() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const loadDashboardData = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await goalService.getGoals();
      setGoals(response.goals || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
  };

  const getGoalStats = () => {
    const total = goals.length;
    const completed = goals.filter(g => g.status === 'completed').length;
    const inProgress = goals.filter(g => g.status === 'in_progress').length;
    const notStarted = goals.filter(g => g.status === 'not_started').length;
    const avgProgress = total > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / total) : 0;

    return { total, completed, inProgress, notStarted, avgProgress };
  };

  const stats = getGoalStats();

  return (
    <View style={styles.container}>
  
      <Image
        source={require('../../assets/favicon.png')}
        style={styles.backgroundImage}
      />
      

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <Text style={styles.welcome}>Welcome back, {user?.name || 'User'}!</Text>
          <Text style={styles.subtitle}>Let's track your career goals</Text>

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : (
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridNumber}>{stats.total}</Text>
                <Text style={styles.gridLabel}>Total Goals</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridNumber}>{stats.completed}</Text>
                <Text style={styles.gridLabel}>Completed</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridNumber}>{stats.inProgress}</Text>
                <Text style={styles.gridLabel}>In Progress</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridNumber}>{stats.notStarted}</Text>
                <Text style={styles.gridLabel}>Not Started</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: '50%',
    left: '50%',
    marginLeft: -100,
    marginTop: -100,
    opacity: 0.1,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  loaderContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  gridItem: {
    width: '48%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  gridNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  gridLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontWeight: '600',
  },
});

