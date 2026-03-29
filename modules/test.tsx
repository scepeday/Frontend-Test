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
    
    //Complete and delete
    const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
        )
        );
    };

    const handleDeleteTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
                onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError('');
                }}
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
                onChange={(event) => setPriority(event.target.value as Priority)}
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

        {tasks.length === 0 ? (
            <p className={styles.emptyState}>No tasks yet.</p>
        ) : (
            <ul className={styles.taskList}>
            {tasks.map((task) => (
                <li
                key={task.id}
                className={`${styles.taskItem} ${task.completed ? styles.completedTask : ''}`}
                >
                <div className={styles.taskLeft}>
                    <input
                    id={`task-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className={styles.checkbox}
                    />

                    <label htmlFor={`task-${task.id}`} className={styles.taskLabel}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.priorityBadge}>{task.priority}</span>
                    </label>
                </div>

                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTask(task.id)}
                >
                    Delete
                </button>
                </li>
            ))}
        </ul>
        )}
        </div>
    </section>
);
};