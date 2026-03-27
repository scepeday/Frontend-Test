'use client'
import React from 'react';
import styles from './test.module.css';
import { useState } from 'react';

// Your Test Starts Here

type Priority = "Low" | "Medium" | "High";
type Filter = "All" | "Active" | "Completed";

type Task = {
    id: number;
    title: string;
    priority: Priority;
    completed: boolean;
};

export default function TaskManager(): JSX.Element {
    //States
    const [ title, setTitle ] = useState('');
    const [ priority, setPriority ] = useState<Priority>('Medium');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>('All');
    const [error, setError] = useState(''); 

    //Validation and Add-task logic
    const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        setError('Please enter a task title.');
        return;
    }

    const newTask: Task = {
        id: Date.now(),
        title: trimmedTitle,
        priority,
        completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);

    setTitle('');
    setPriority('Medium');
    setError('');
    };
    
    //Form UI
    return (
    <section className={styles.wrapper}>
        <div className={styles.card}>
        <h1 className={styles.heading}>Task Manager</h1>

        <form className={styles.form} onSubmit={handleAddTask}>
            <div className={styles.field}>
            <label htmlFor="task-title" className={styles.label}>
                Task title
            </label>
            <input
                id="task-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter a task title"
                className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            </div>

            <div className={styles.field}>
            <label htmlFor="task-priority" className={styles.label}>
                Priority
            </label>
            <select
                id="task-priority"
                value={priority}
                onChange={(event) => {
                    setTitle(event.target.value);
                    if (error) setError('');
                }}
                className={styles.select}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            </div>

            <button type="submit" className={styles.addButton}>
            Add task
            </button>
        </form>
        </div>
    </section>
);
};