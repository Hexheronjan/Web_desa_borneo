-- Hapus Desa jika sudah ada (Opsional untuk clean install)
DELETE FROM `User`;
DELETE FROM `Desa`;

-- Buat 1 Desa Default
INSERT INTO `Desa` (`id`, `nama`, `kodeProvinsi`, `kodeKabupaten`, `kodeKecamatan`, `kepalaDesa`) 
VALUES ('desa-borneo-01', 'Desa Adat Borneo', '61', '6101', '610101', 'Bapak Kades Borneo');

-- Buat Akun Warga
INSERT INTO `User` (`id`, `desaId`, `name`, `email`, `password`, `role`) 
VALUES ('user-warga', 'desa-borneo-01', 'Budi Warga', 'warga@borneo.id', 'password123', 'warga');

-- Buat Akun Admin
INSERT INTO `User` (`id`, `desaId`, `name`, `email`, `password`, `role`) 
VALUES ('user-admin', 'desa-borneo-01', 'Admin Utama', 'admin@borneo.id', 'password123', 'admin_super');

-- Buat Akun Nakes
INSERT INTO `User` (`id`, `desaId`, `name`, `email`, `password`, `role`) 
VALUES ('user-nakes', 'desa-borneo-01', 'Bidan Siti', 'nakes@borneo.id', 'password123', 'nakes_posyandu');

-- Buat Akun Guru
INSERT INTO `User` (`id`, `desaId`, `name`, `email`, `password`, `role`) 
VALUES ('user-guru', 'desa-borneo-01', 'Pak Guru Budi', 'guru@borneo.id', 'password123', 'guru_fasilitator');

-- Buat Akun Pemdes
INSERT INTO `User` (`id`, `desaId`, `name`, `email`, `password`, `role`) 
VALUES ('user-pemdes', 'desa-borneo-01', 'Perangkat Desa', 'pemdes@borneo.id', 'password123', 'pemerintah_desa');

-- Buat Akun Lembaga Adat
INSERT INTO `User` (`id`, `desaId`, `name`, `email`, `password`, `role`) 
VALUES ('user-adat', 'desa-borneo-01', 'Ketua Adat', 'adat@borneo.id', 'password123', 'lembaga_adat');
