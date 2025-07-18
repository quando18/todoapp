import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './todo.css'; // nếu bạn muốn thêm css tùy chỉnh

export default function Todo() {
  const [taskText, setTaskText] = useState('');
  const [status, setStatus] = useState('todo');
  const [tasks, setTasks] = useState([]);

  const handleAdd = () => {
    if (!taskText.trim()) {
      toast.error('Nội dung task không được để trống!');
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskText,
      status: status,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
    toast.success('Đã thêm task mới!');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.info('Đã xóa task!');
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
    toast.success(`Đã chuyển sang "${newStatus}"`);
  };

  const handleEdit = (id) => {
    const newText = prompt('Sửa nội dung task:');
    if (newText !== null && newText.trim() !== '') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      ));
      toast.success('Đã sửa task!');
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <div key={task.id} className="task">
          <p>{task.text}</p>
          <div className="buttons">
            <button onClick={() => handleEdit(task.id)}>✏️</button>
            <button onClick={() => handleDelete(task.id)}>🗑️</button>
            {status !== 'todo' && (
              <button onClick={() => handleStatusChange(task.id, 'todo')}>⬅️</button>
            )}
            {status !== 'done' && (
              <button onClick={() => handleStatusChange(task.id, 'done')}>➡️</button>
            )}
            {status === 'todo' && (
              <button onClick={() => handleStatusChange(task.id, 'inprogress')}>▶️</button>
            )}
            {status === 'inprogress' && (
              <button onClick={() => handleStatusChange(task.id, 'done')}>✅</button>
            )}
          </div>
        </div>
      ));
  };

  return (
    <div className="todo-container">
      <ToastContainer />
      <h1>Todo App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Nhập nội dung task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <div className="columns">
        <div className="column">
          <h2>📝 Todo</h2>
          {renderTasks('todo')}
        </div>
        <div className="column">
          <h2>🚧 In Progress</h2>
          {renderTasks('inprogress')}
        </div>
        <div className="column">
          <h2>✅ Done</h2>
          {renderTasks('done')}
        </div>
      </div>
    </div>
  );
}
