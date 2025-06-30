import { Play, Pause, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

export const TimeTracking = () => {
  const todayHours = 6.5;
  const weekHours = 32;
  const isTracking = false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-green-600" />
          Control de Tiempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Timer Display */}
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-mono font-bold text-green-600 mb-2">
              02:30:45
            </div>
            <p className="text-sm text-green-700">Sesión actual</p>
          </div>

          {/* Timer Controls */}
          <div className="flex gap-2">
            <Button 
              className={`flex-1 ${isTracking ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isTracking ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar
                </>
              )}
            </Button>
          </div>

          {/* Time Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hoy:</span>
              <span className="font-medium">{todayHours}h</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Esta semana:</span>
              <span className="font-medium">{weekHours}h</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Objetivo semanal:</span>
                <span className="font-medium">40h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(weekHours / 40) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};