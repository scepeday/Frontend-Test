'use client'
import React from 'react';
import styles from './test.module.css';
import { useState, useEffect } from 'react';

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
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const [searchTerm, setSearchTerm] = useState('');

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
    
    //Filters and organized task list
    const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
        filter === 'All'
        ? true
        : filter === 'Active'
        ? !task.completed
        : task.completed;

    const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
    });

    const activeTasks = filteredTasks.filter((task) => !task.completed);
    const completedTasks = filteredTasks.filter((task) => task.completed);
    const visibleTasks = [...activeTasks, ...completedTasks];

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
        
        <div className={styles.field}>
            <label htmlFor="task-search" className={styles.label}>
                Search tasks
            </label>
            <input
                id="task-search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by title"
                className={styles.input}
            />
        </div>
        
        <div className={styles.filters}>
            <button
                type="button"
                className={`${styles.filterButton} ${filter === 'All' ? styles.activeFilter : ''}`}
                onClick={() => setFilter('All')}
            >
                All
            </button>

            <button
                type="button"
                className={`${styles.filterButton} ${filter === 'Active' ? styles.activeFilter : ''}`}
                onClick={() => setFilter('Active')}
            >
                Active
            </button>

            <button
                type="button"
                className={`${styles.filterButton} ${filter === 'Completed' ? styles.activeFilter : ''}`}
                onClick={() => setFilter('Completed')}
            >
                Completed
            </button>
        </div>

        {visibleTasks.length === 0 ? (
            <p className={styles.emptyState}>No tasks yet.</p>
        ) : (
            <ul className={styles.taskList}>
            {visibleTasks.map((task) => (
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