import { useState } from 'react';
import { Plus, CheckCircle2, Clock, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Task } from '@/types';

const StudentTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Software Engineering Assignment',
      description: 'Prepare UML diagrams and project documentation',
      dueDate: '2024-01-15',
      completed: false,
      type: 'assignment'
    },
    {
      id: '2',
      title: 'Study for Computer Networks Exam',
      description: 'Review OSI model and TCP/IP protocols',
      dueDate: '2024-01-18',
      completed: true,
      type: 'personal'
    },
    {
      id: '3',
      title: 'Submit Research Methodology Report',
      description: 'Literature review and methodology chapter',
      dueDate: '2024-01-20',
      completed: false,
      type: 'assignment'
    }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    type: 'personal' as 'assignment' | 'personal'
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        completed: false,
        type: newTask.type
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', dueDate: '', type: 'personal' });
      setIsAddingTask(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Task Manager</h2>
          <p className="text-muted-foreground">Manage your assignments and personal tasks</p>
        </div>
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Due Date</label>
                <Input
                  type="datetime-local"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
                <select
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value as 'assignment' | 'personal' })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="personal">Personal Task</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Overview */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{pendingTasks.length}</div>
            <div className="text-sm text-muted-foreground">Pending Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{completedTasks.length}</div>
            <div className="text-sm text-muted-foreground">Completed Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{tasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
        </div>
      </Card>

      {/* Pending Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-warning" />
          Pending Tasks
        </h3>
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <Card key={task.id} className="p-4 hover:shadow-soft transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTask(task.id)}
                    className="mt-1"
                  >
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  </Button>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center space-x-3 mt-2">
                      <Badge variant={task.type === 'assignment' ? 'default' : 'secondary'}>
                        {task.type}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      {isOverdue(task.dueDate) && (
                        <Badge variant="destructive">Overdue</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
          {pendingTasks.length === 0 && (
            <Card className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto text-success mb-4" />
              <h3 className="font-medium text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No pending tasks. Great job!</p>
            </Card>
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-success" />
            Completed Tasks
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task.id} className="p-4 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTask(task.id)}
                      className="mt-1"
                    >
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </Button>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground line-through">{task.title}</h4>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-through">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge variant={task.type === 'assignment' ? 'default' : 'secondary'}>
                          {task.type}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <Badge variant="outline" className="text-success border-success">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTasks;