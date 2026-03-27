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
    return <div className={styles.container}>
        <section className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.heading}>Task Manager</h1>
            </div>
        </section>
    </div>;
};