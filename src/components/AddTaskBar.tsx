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
                <Text style={styles.buttonText}>Add</Text>
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
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
        backgroundColor: '#fafafd',
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        minWidth: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonDisabled: {
        backgroundColor: '#bbb',
    },
});

export default AddTaskBar;
