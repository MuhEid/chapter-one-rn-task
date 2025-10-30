import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import type { Priority } from '../types/task';

type AddTaskBarProps = {
    onAdd: (title: string, priority: Priority) => void;
};

const AddTaskBar: React.FC<AddTaskBarProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');

    const trimmed = title.trim();
    const isDisabled = trimmed.length === 0;

    const handleAdd = () => {
        const finalTitle = title.trim();
        if (finalTitle === '') return;
        onAdd(finalTitle, selectedPriority);
        setTitle('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Add a task..."
                placeholderTextColor="#CFC7B8"
                returnKeyType="done"
                style={styles.input}
                onSubmitEditing={handleAdd}
                blurOnSubmit={false}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <View style={styles.priorityRow}>
                <PriorityChip
                    label="High"
                    isActive={selectedPriority === 'high'}
                    color="#EADBC0"
                    onPress={() => setSelectedPriority('high')}
                />
                <PriorityChip
                    label="Medium"
                    isActive={selectedPriority === 'medium'}
                    color="#CFC7B8"
                    onPress={() => setSelectedPriority('medium')}
                />
                <PriorityChip
                    label="Low"
                    isActive={selectedPriority === 'low'}
                    color="#2A3A66"
                    onPress={() => setSelectedPriority('low')}
                />
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    isDisabled ? styles.buttonDisabled : undefined,
                    pressed && !isDisabled ? styles.buttonPressed : undefined,
                ]}
                onPress={handleAdd}
                disabled={isDisabled}
                accessibilityLabel="Add task"
                accessibilityRole="button"
            >
                <Text style={[styles.buttonText, isDisabled && styles.buttonTextDisabled]}>Add</Text>
            </Pressable>
        </View>
    );
};

function PriorityChip({ label, isActive, color, onPress }: { label: string; isActive: boolean; color: string; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Set priority ${label}`}
            style={({ pressed }) => [
                styles.chip,
                { borderColor: color },
                isActive && { backgroundColor: color },
                pressed && { opacity: 0.85 },
            ]}
        >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
        gap: 8,
    },
    input: {
        fontSize: 16,
        color: '#F5F1E8',
        borderWidth: 1,
        borderColor: '#2A3A66',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#12244D',
    },
    priorityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    chip: {
        borderWidth: 1,
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
    },
    chipText: {
        color: '#F5F1E8',
        fontSize: 12,
        fontWeight: '600',
    },
    chipTextActive: {
        color: '#0B1B3B',
    },
    button: {
        backgroundColor: '#EADBC0',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        minWidth: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#0B1B3B',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    buttonTextDisabled: {
        color: '#3B4A75',
    },
    buttonPressed: {
        opacity: 0.85,
    },
    buttonDisabled: {
        backgroundColor: '#CFC7B8',
    },
});

export default AddTaskBar;
