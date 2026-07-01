'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, Server, Globe, Bell, Shield } from 'lucide-react';

const COLOR = '#1a237e';

export default function KonfigurasiSistemPage() {
  const [config, setConfig] = useState({
    namaSistem: 'APL-SLV BORNEO Smart Living Village',
    versiSistem: 'v2.0',
    urlSistem: 'https://apl.slvborneo.com',
    emailAdmin: 'admin@slvborneo.com',
    maintenanceMode: false,
    maxUploadSize: '50',
    sessionTimeout: '60',
    backupOtomatis: true,
    backupSchedule: '02:00',
    notifikasiEmail: true,
    notifikasiSms: false,
    deskripsiSistem: 'Sistem Smart Living Village untuk monitoring dan assessment desa digital di Kalimantan.',
  });

  const handleSave = () => {
    console.log('Saving config:', config);
    alert('Konfigurasi sistem berhasil disimpan!');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Konfigurasi Sistem" modul="Administration" color={COLOR} />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Settings size={16} /> Pengaturan Umum
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Nama Sistem</Label>
              <Input
                value={config.namaSistem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, namaSistem: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Versi Sistem</Label>
              <Input
                value={config.versiSistem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, versiSistem: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">URL Sistem</Label>
              <Input
                value={config.urlSistem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, urlSistem: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Email Admin</Label>
              <Input
                type="email"
                value={config.emailAdmin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, emailAdmin: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Deskripsi Sistem</Label>
            <Textarea
              value={config.deskripsiSistem}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setConfig({ ...config, deskripsiSistem: e.target.value })}
              className="mt-1 min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Server size={16} /> Pengaturan Server
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Max Upload Size (MB)</Label>
              <Input
                type="number"
                value={config.maxUploadSize}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, maxUploadSize: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Session Timeout (menit)</Label>
              <Input
                type="number"
                value={config.sessionTimeout}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, sessionTimeout: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between pt-6">
              <Label className="text-sm font-medium">Maintenance Mode</Label>
              <Switch
                checked={config.maintenanceMode}
                onCheckedChange={(checked: boolean) => setConfig({ ...config, maintenanceMode: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Shield size={16} /> Pengaturan Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <Label className="text-sm font-medium">Backup Otomatis</Label>
                <p className="text-xs text-slate-500 mt-1">Aktifkan backup harian otomatis</p>
              </div>
              <Switch
                checked={config.backupOtomatis}
                onCheckedChange={(checked: boolean) => setConfig({ ...config, backupOtomatis: checked })}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Jadwal Backup</Label>
              <Input
                type="time"
                value={config.backupSchedule}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, backupSchedule: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Bell size={16} /> Pengaturan Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <Label className="text-sm font-medium">Notifikasi Email</Label>
                <p className="text-xs text-slate-500 mt-1">Kirim notifikasi via email</p>
              </div>
              <Switch
                checked={config.notifikasiEmail}
                onCheckedChange={(checked: boolean) => setConfig({ ...config, notifikasiEmail: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <Label className="text-sm font-medium">Notifikasi SMS</Label>
                <p className="text-xs text-slate-500 mt-1">Kirim notifikasi via SMS</p>
              </div>
              <Switch
                checked={config.notifikasiSms}
                onCheckedChange={(checked: boolean) => setConfig({ ...config, notifikasiSms: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
          <Save size={16} className="mr-2" /> Simpan Konfigurasi
        </Button>
      </div>
    </div>
  );
}
