import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import AddTaskBar from '../components/AddTaskBar';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/task';

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAdd = (title: string) => {
        const newTask: Task = {
            id: String(Date.now()),
            title,
            done: false,
            createdAt: Date.now(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleToggle = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    const handleDelete = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // Incomplete at top, completed at bottom; newest first within each group
    const sortedTasks = useMemo(
        () =>
            [...tasks].sort((a, b) => {
                if (a.done !== b.done) return Number(a.done) - Number(b.done);
                return b.createdAt - a.createdAt;
            }),
        [tasks]
    );

    return (
        <View style={styles.container}>
            <PatternOverlay />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tasks</Text>
                <Pressable
                    accessibilityLabel="Open settings"
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.settingsButton, pressed && styles.settingsButtonPressed]}
                    onPress={() => { }}
                >
                    <Text style={styles.settingsIcon}>⚙️</Text>
                </Pressable>
            </View>
            <AddTaskBar onAdd={handleAdd} />
            <FlatList
                data={sortedTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={() => handleToggle(item.id)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nothing to do! Add your first task.</Text>
                    </View>
                }
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={sortedTasks.length === 0 ? { flex: 1 } : undefined}
            />
        </View>
    );
}

function PatternOverlay() {
    const dots = Array.from({ length: 120 });
    return (
        <View pointerEvents="none" style={styles.patternContainer}>
            {dots.map((_, idx) => (
                <View key={idx} style={styles.patternDot} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1B3B',
        paddingTop: 36,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 6,
    },
    headerTitle: {
        color: '#F5F1E8',
        fontSize: 22,
        fontWeight: '700',
    },
    settingsButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#12244D',
        borderWidth: 1,
        borderColor: '#2A3A66',
    },
    settingsButtonPressed: {
        opacity: 0.85,
    },
    settingsIcon: {
        fontSize: 16,
        color: '#F5F1E8',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    emptyText: {
        color: '#CFC7B8',
        fontSize: 18,
        fontWeight: '500',
    },
    patternContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        opacity: 0.08,
    },
    patternDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E8DFC8',
        margin: 12,
    },
});
