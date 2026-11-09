import { useState } from 'react';
import Header from './components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        reportCount={0}
      />

      {isOffline && (
        <div className="bg-orange-100 text-orange-900 text-center p-2 text-sm">
          You are currently offline. Reports will be saved to local storage.
        </div>
      )}

      <main className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Card>
          <CardHeader>
            <CardTitle>New Site Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Form will be added here.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Report list will be shown here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default App;