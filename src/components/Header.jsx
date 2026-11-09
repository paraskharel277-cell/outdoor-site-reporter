import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function Header({ isOffline, setIsOffline, reportCount }) {
  return (
    <header className="bg-slate-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Outdoor Site Reporter</h1>
          <p className="text-xs text-slate-400">Field Inspection App</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className={isOffline ? 'bg-orange-600' : 'bg-green-600'}>
            {isOffline ? 'Offline' : 'Online'}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOffline(!isOffline)}
            className="text-black bg-white hover:bg-slate-200 text-xs"
          >
            {isOffline ? 'Go Online' : 'Go Offline'}
          </Button>

          <span className="text-sm text-slate-300">
            Total Reports: {reportCount}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;