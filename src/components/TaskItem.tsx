import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Task } from '../types/task';

type TaskItemProps = {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.circle, task.done ? styles.circleDone : styles.circleUndone]}
                onPress={onToggle}
                accessibilityLabel={task.done ? 'Mark as undone' : 'Mark as done'}
                accessibilityRole="button"
            >
                {task.done ? <View style={styles.innerCircle} /> : null}
            </Pressable>
            <Text
                style={[styles.title, task.done && styles.titleDone]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {task.title}
            </Text>
            <Pressable
                style={styles.deleteButton}
                onPress={onDelete}
                accessibilityLabel="Delete task"
                accessibilityRole="button"
            >
                <Text style={styles.deleteIcon}>🗑️</Text>
            </Pressable>
        </View>
    );
};

const CIRCLE_SIZE = 24;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#12244D',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#2A3A66',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderWidth: 2,
        borderColor: '#CFC7B8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        backgroundColor: '#12244D',
    },
    circleUndone: {
        // outlined look, no inner fill
    },
    circleDone: {
        backgroundColor: '#EADBC0',
        borderColor: '#EADBC0',
    },
    innerCircle: {
        width: CIRCLE_SIZE * 0.55,
        height: CIRCLE_SIZE * 0.55,
        borderRadius: (CIRCLE_SIZE * 0.55) / 2,
        backgroundColor: '#0B1B3B',
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#F5F1E8',
    },
    titleDone: {
        color: '#CFC7B8',
        textDecorationLine: 'line-through',
    },
    deleteButton: {
        marginLeft: 14,
        padding: 6,
        borderRadius: 16,
    },
    deleteIcon: {
        fontSize: 18,
        color: '#CFC7B8',
    },
});

export default TaskItem;
