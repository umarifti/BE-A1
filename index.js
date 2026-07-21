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

app.put('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${req.params.id} not found`,
    });
  }

  const { title, done } = req.body || {};
  const hasTitle = title !== undefined;
  const hasDone = done !== undefined;

  if (!hasTitle && !hasDone) {
    return res.status(400).json({
      error: 'request body must include title and/or done',
    });
  }

  if (hasTitle && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({
      error: 'title must be a non-empty string',
    });
  }

  if (hasDone && typeof done !== 'boolean') {
    return res.status(400).json({
      error: 'done must be a boolean',
    });
  }

  if (hasTitle) task.title = title;
  if (hasDone) task.done = done;

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: `Task ${req.params.id} not found`,
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});