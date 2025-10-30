import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

type AddTaskBarProps = {
    onAdd: (title: string) => void;
};

const AddTaskBar: React.FC<AddTaskBarProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const trimmed = title.trim();
    const isDisabled = trimmed.length === 0;

    const handleAdd = () => {
        const finalTitle = title.trim();
        if (finalTitle === '') return;
        onAdd(finalTitle);
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#F5F1E8',
        borderWidth: 1,
        borderColor: '#2A3A66',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 10,
        backgroundColor: '#12244D',
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
