import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskBoard from './components/TaskBoard';
import TaskStats from './components/TaskStats';
import './App.css';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('');

  const addOrUpdateTask = (task) => {
    setTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) {
        return prev.map(t => t.id === task.id ? task : t);
      }
      return [...prev, { ...task, id: Date.now() }];
    });
  };

  const updateStatus = (id, newStatus) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (filterStatus === 'all' || task.status === filterStatus) &&
      (filterAssignee === '' || task.assignee === filterAssignee) &&
      (task.title.toLowerCase().includes(search.toLowerCase()) ||
       task.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="dashboard">
      <h1>Task Management Dashboard</h1>
      <div className="controls d-flex flex-wrap align-items-center gap-2 mb-3">
            <button onClick={() => setView('list')} className="btn btn-primary">
              List View
            </button>

            <button onClick={() => setView('board')} className="btn btn-secondary">
              Kanban Board
            </button>

            <input
              type="text"
              className="form-control w-auto"
              placeholder="Search tasks..."
              onChange={(e) => setSearch(e.target.value)}
              style={{ minWidth: '180px' }}
            />

            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select w-auto"
              style={{ minWidth: '160px' }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="text"
              className="form-control w-auto"
              placeholder="Filter by assignee..."
              onChange={(e) => setFilterAssignee(e.target.value)}
              style={{ minWidth: '180px' }}
            />
        </div>

      <TaskForm onSubmit={addOrUpdateTask} />
      {view === 'list' ? (
        <TaskList tasks={filteredTasks} updateStatus={updateStatus} />
      ) : (
        <TaskBoard tasks={filteredTasks} updateStatus={updateStatus} />
      )}
      <TaskStats tasks={tasks} />
    </div>
  );
};

export default App;