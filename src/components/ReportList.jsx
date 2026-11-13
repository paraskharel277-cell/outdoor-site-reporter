import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function ReportList({ reports, onUpdateReport, onDeleteReport }) {
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editStatus, setEditStatus] = useState('Open');
  const [editNotes, setEditNotes] = useState('');

  const startEdit = (report) => {
    setEditingId(report.id);
    setEditTitle(report.title);
    setEditStatus(report.status);
    setEditNotes(report.notes);
  };

  const saveEdit = (id) => {
    onUpdateReport(id, {
      title: editTitle,
      status: editStatus,
      notes: editNotes,
    });
    setEditingId(null);
  };

  const filteredReports = reports.filter((item) => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 pb-2 border-b">
        {['All', 'Open', 'In Progress', 'Resolved'].map((status) => (
          <Button
            key={status}
            size="sm"
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            className="text-xs"
          >
            {status}
          </Button>
        ))}
      </div>

      {filteredReports.length === 0 ? (
        <p className="text-sm text-slate-500 py-4 text-center">
          No reports found.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-3 bg-white space-y-2"
            >
              {editingId === report.id ? (
                <div className="space-y-2">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <Textarea
                    rows={2}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveEdit(report.id)}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {report.area} | {report.category}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant="outline">{report.priority}</Badge>
                      <Badge
                        className={
                          report.status === 'Resolved'
                            ? 'bg-green-600'
                            : report.status === 'In Progress'
                            ? 'bg-blue-600'
                            : 'bg-slate-700'
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 bg-slate-50 p-2 rounded">
                    {report.notes}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-400">{report.date}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(report)}
                        className="h-7 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteReport(report.id)}
                        className="h-7 text-xs text-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportList;