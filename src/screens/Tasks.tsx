import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import AddTaskBar from '../components/AddTaskBar';
import TaskItem from '../components/TaskItem';

export type Task = {
    id: string;
    title: string;
    done: boolean;
};

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAdd = (title: string) => {
        const newTask: Task = {
            id: String(Date.now()),
            title,
            done: false,
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

    // Incomplete at top, completed at bottom
    const sortedTasks = useMemo(
        () => [...tasks].sort((a, b) => Number(a.done) - Number(b.done)),
        [tasks]
    );

    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 36,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    emptyText: {
        color: '#bbb',
        fontSize: 18,
        fontWeight: '500',
    },
});
