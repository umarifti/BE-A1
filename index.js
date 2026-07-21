const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
  { id: 1, title: 'Set up the API', done: true },
  { id: 2, title: 'Add task routes', done: true },
  { id: 3, title: 'Verify the responses', done: false },
];

app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks'],
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${req.params.id} not found`,
    });
  }

  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'title is required and must be a non-empty string',
    });
  }

  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const newTask = {
    id: nextId,
    title,
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});