import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Task = {
    id: string;
    title: string;
    done: boolean;
};

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
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    circleUndone: {
        backgroundColor: 'white',
    },
    circleDone: {
        backgroundColor: '#94c9a9', // Light green background when done
        borderColor: '#659977',
    },
    innerCircle: {
        width: CIRCLE_SIZE * 0.55,
        height: CIRCLE_SIZE * 0.55,
        borderRadius: (CIRCLE_SIZE * 0.55) / 2,
        backgroundColor: '#41724d', // Darker green inner circle
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#222',
    },
    titleDone: {
        color: '#aaa',
        textDecorationLine: 'line-through',
    },
    deleteButton: {
        marginLeft: 14,
        padding: 6,
        borderRadius: 16,
    },
    deleteIcon: {
        fontSize: 18,
    },
});

export default TaskItem;
