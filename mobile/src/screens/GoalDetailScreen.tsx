import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  PanResponder,
  Dimensions,
} from 'react-native';
import { goalService } from '../services/api';

interface Goal {
  id: number;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  createdAt: string;
  updatedAt: string;
}

// Custom Progress Slider Component
function ProgressSlider({ value, onChange }: { value: number; onChange: (progress: number) => void }) {
  const handleTrackPress = (event: any) => {
    const { width } = event.nativeEvent.target.props.style;
    const x = event.nativeEvent.locationX;
    const newProgress = Math.round((x / width) * 100);
    onChange(Math.max(0, Math.min(newProgress, 100)));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Get the width of the track from the event
        const maxWidth = Dimensions.get('window').width - 40;
        const newX = Math.max(0, Math.min(gestureState.x0 + gestureState.dx, maxWidth));
        const newProgress = Math.round((newX / maxWidth) * 100);
        onChange(Math.max(0, Math.min(newProgress, 100)));
      },
    })
  ).current;

  const trackWidth = Dimensions.get('window').width - 40;

  return (
    <View
      style={[styles.sliderTrack, { width: trackWidth }]}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleTrackPress}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          styles.sliderFill,
          { width: `${value}%` },
        ]}
      />
    </View>
  );
}

// TODO: Task 4 - Complete Goal Detail Screen
// Requirements:
// 1. Fetch goal details from goalService.getGoal(id)
// 2. Display all goal information
// 3. Add ability to update goal status
// 4. Show creation and update dates
// 5. Add delete goal functionality with confirmation
// 6. Navigate back after delete
// 7. Handle loading and error states

export default function GoalDetailScreen({ route, navigation }: any) {
  const { goalId } = route.params;
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoal();
  }, [goalId]);

  const loadGoal = async () => {
    try {
      setLoading(true);
      const data = await goalService.getGoal(goalId);
      setGoal(data);
    } catch (error) {
      console.error('Error loading goal:', error);
      Alert.alert('Error', 'Failed to load goal details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!goal) return;

    try {
      // Auto-update progress based on status
      let progress = 0;
      if (newStatus === 'in_progress') {
        progress = 50;
      } else if (newStatus === 'completed') {
        progress = 100;
      }

      const updated = await goalService.updateGoal(goal.id, { 
        status: newStatus,
        progress: progress
      });
      setGoal(updated);
    } catch (error) {
      Alert.alert('Error', 'Failed to update goal status');
    }
  };

  const handleUpdateProgress = async (newProgress: number) => {
    if (!goal) return;

    try {
      // Determine status based on progress
      let newStatus = 'not_started';
      if (newProgress > 0 && newProgress < 100) {
        newStatus = 'in_progress';
      } else if (newProgress === 100) {
        newStatus = 'completed';
      }

      const updated = await goalService.updateGoal(goal.id, { 
        progress: newProgress,
        status: newStatus
      });
      setGoal(updated);
    } catch (error) {
      Alert.alert('Error', 'Failed to update progress');
    }
  };

  const handleDelete = () => {
    if (!goal) return;

    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await goalService.deleteGoal(goal.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete goal');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!goal) {
    return (
      <View style={styles.centerContainer}>
        <Text>Goal not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{goal.title}</Text>
        
        {goal.description && (
          <Text style={styles.description}>{goal.description}</Text>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusContainer}>
            {['not_started', 'in_progress', 'completed'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  goal.status === status && styles.statusButtonActive,
                ]}
                onPress={() => handleUpdateStatus(status)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    goal.status === status && styles.statusButtonTextActive,
                  ]}
                >
                  {status.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <ProgressSlider 
            value={goal.progress} 
            onChange={handleUpdateProgress}
          />
          <Text style={styles.progressText}>{goal.progress}%</Text>
        </View>

        <View style={styles.meta}>
          <Text style={styles.metaText}>
            Created: {new Date(goal.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.metaText}>
            Updated: {new Date(goal.updatedAt).toLocaleDateString()}
          </Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 8,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 12,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    position: 'absolute',
    top: -9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statusIndicator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 12,
  },
  progressControls: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  progressButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  progressResetButton: {
    backgroundColor: '#999',
  },
  progressButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  meta: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  metaText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ff4444',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

