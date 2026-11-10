import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function ReportForm({ onAddReport }) {
  const [title, setTitle] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('Safety Hazard');
  const [priority, setPriority] = useState('Medium');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !notes.trim()) {
      alert('Please fill in the title and notes.');
      return;
    }

    const newReport = {
      id: Date.now(),
      title,
      area: area || 'Main Site',
      category,
      priority,
      status: 'Open',
      notes,
      date: new Date().toLocaleString(),
      gps: null,
      heading: null,
      photo: null,
    };

    onAddReport(newReport);

    setTitle('');
    setArea('');
    setCategory('Safety Hazard');
    setPriority('Medium');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Issue Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Broken fence on north track"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="area">Site Area / Zone</Label>
        <Input
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g. Zone B - Gate 3"
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="Safety Hazard">Safety Hazard</option>
            <option value="Equipment Fault">Equipment Fault</option>
            <option value="Weather Damage">Weather Damage</option>
            <option value="Routine Check">Routine Check</option>
          </select>
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full mt-1 h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Inspection Notes</Label>
        <Textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe the issue found on site..."
          className="mt-1"
        />
      </div>

      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
        Save Report
      </Button>
    </form>
  );
}

export default ReportForm;