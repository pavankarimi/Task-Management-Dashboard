import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !assignee) return;
    onSubmit({ title, description, priority, assignee, status: 'pending' });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssignee('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form d-flex align-items-center gap-2 flex-wrap">
  <input
    type="text"
    value={title}
    onChange={e => setTitle(e.target.value)}
    placeholder="Title"
    required
    className="form-control"
    style={{ width: '150px' }}
  />
  <input
    type="text"
    value={description}
    onChange={e => setDescription(e.target.value)}
    placeholder="Description"
    required
    className="form-control"
    style={{ width: '200px' }}
  />
  <input
    type="text"
    value={assignee}
    onChange={e => setAssignee(e.target.value)}
    placeholder="Assignee"
    required
    className="form-control"
    style={{ width: '150px' }}
  />
  <select
    value={priority}
    onChange={e => setPriority(e.target.value)}
    className="form-select"
    style={{ width: '120px' }}
  >
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>
  <button type="submit" className="btn btn-primary">
    Add Task
  </button>
</form>

  );
};

export default TaskForm;