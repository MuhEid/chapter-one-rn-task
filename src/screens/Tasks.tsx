import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import AddTaskBar from '../components/AddTaskBar';
import TaskItem from '../components/TaskItem';
import { Task, Priority } from '../types/task';

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

    const handleAdd = (title: string, priority: Priority) => {
        const newTask: Task = {
            id: String(Date.now()),
            title,
            done: false,
            createdAt: Date.now(),
            priority: priority ?? 'medium',
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

    // Filter by priority, then sort: incomplete first, then complete; newest first within group
    const visibleTasks = useMemo(() => {
        const filtered = priorityFilter === 'all' ? tasks : tasks.filter(t => t.priority === priorityFilter);
        return [...filtered].sort((a, b) => {
            if (a.done !== b.done) return Number(a.done) - Number(b.done);
            return b.createdAt - a.createdAt;
        });
    }, [tasks, priorityFilter]);

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

            <View style={styles.filterRow}>
                <FilterChip label="All" active={priorityFilter === 'all'} onPress={() => setPriorityFilter('all')} />
                <FilterChip label="High" active={priorityFilter === 'high'} onPress={() => setPriorityFilter('high')} />
                <FilterChip label="Medium" active={priorityFilter === 'medium'} onPress={() => setPriorityFilter('medium')} />
                <FilterChip label="Low" active={priorityFilter === 'low'} onPress={() => setPriorityFilter('low')} />
            </View>

            <AddTaskBar onAdd={handleAdd} />

            <FlatList
                data={visibleTasks}
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
                contentContainerStyle={visibleTasks.length === 0 ? { flex: 1 } : undefined}
            />
        </View>
    );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Filter ${label}`}
            style={({ pressed }) => [
                styles.filterChip,
                active && styles.filterChipActive,
                pressed && { opacity: 0.85 },
            ]}
        >
            <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{label}</Text>
        </Pressable>
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
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    filterChip: {
        borderWidth: 1,
        borderColor: '#2A3A66',
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#12244D',
    },
    filterChipActive: {
        borderColor: '#EADBC0',
        backgroundColor: '#EADBC0',
    },
    filterChipText: {
        color: '#F5F1E8',
        fontSize: 12,
        fontWeight: '600',
    },
    filterChipTextActive: {
        color: '#0B1B3B',
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
