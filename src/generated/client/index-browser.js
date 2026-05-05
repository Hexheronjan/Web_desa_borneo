
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.21.1
 * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
 */
Prisma.prismaVersion = {
  client: "5.21.1",
  engine: "bf0e5e8a04cada8225617067eaa03d041e2bba36"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  desaId: 'desaId',
  wargaId: 'wargaId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DesaScalarFieldEnum = {
  id: 'id',
  nama: 'nama',
  kecamatan: 'kecamatan',
  kabupaten: 'kabupaten',
  provinsi: 'provinsi',
  luasWilayah: 'luasWilayah',
  sejarah: 'sejarah',
  createdAt: 'createdAt'
};

exports.Prisma.RwRtScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  rw: 'rw',
  rt: 'rt',
  jumlahWarga: 'jumlahWarga'
};

exports.Prisma.WargaScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  rwRtId: 'rwRtId',
  nik: 'nik',
  nama: 'nama',
  tempatLahir: 'tempatLahir',
  tanggalLahir: 'tanggalLahir',
  jenisKelamin: 'jenisKelamin',
  alamat: 'alamat',
  noHp: 'noHp',
  foto: 'foto',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.KelasScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  modul: 'modul',
  nama: 'nama',
  batch: 'batch',
  waktu: 'waktu',
  fasilitatorId: 'fasilitatorId',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.MateriScalarFieldEnum = {
  id: 'id',
  kelasId: 'kelasId',
  judul: 'judul',
  tipe: 'tipe',
  url: 'url',
  createdAt: 'createdAt'
};

exports.Prisma.PesertaKelasScalarFieldEnum = {
  id: 'id',
  kelasId: 'kelasId',
  wargaId: 'wargaId',
  status: 'status',
  nilai: 'nilai',
  sertifikat: 'sertifikat',
  createdAt: 'createdAt'
};

exports.Prisma.TugasScalarFieldEnum = {
  id: 'id',
  kelasId: 'kelasId',
  judul: 'judul',
  deskripsi: 'deskripsi',
  deadline: 'deadline',
  statusReview: 'statusReview',
  createdAt: 'createdAt'
};

exports.Prisma.RekamMedisScalarFieldEnum = {
  id: 'id',
  wargaId: 'wargaId',
  tanggal: 'tanggal',
  diagnosis: 'diagnosis',
  nakes: 'nakes',
  catatan: 'catatan',
  alergi: 'alergi',
  createdAt: 'createdAt'
};

exports.Prisma.TelemedicineScalarFieldEnum = {
  id: 'id',
  wargaId: 'wargaId',
  waktu: 'waktu',
  status: 'status',
  nakesId: 'nakesId',
  catatanKonsultasi: 'catatanKonsultasi',
  suratRujukan: 'suratRujukan',
  createdAt: 'createdAt'
};

exports.Prisma.MonitoringKesehatanScalarFieldEnum = {
  id: 'id',
  wargaId: 'wargaId',
  tanggal: 'tanggal',
  beratBadan: 'beratBadan',
  tinggiBadan: 'tinggiBadan',
  tensiSistolik: 'tensiSistolik',
  tensiDiastolik: 'tensiDiastolik',
  suhu: 'suhu',
  alert: 'alert',
  createdAt: 'createdAt'
};

exports.Prisma.PosyanduScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  tanggal: 'tanggal',
  lokasi: 'lokasi',
  jumlahBalita: 'jumlahBalita',
  jumlahImunisasi: 'jumlahImunisasi',
  catatan: 'catatan',
  createdAt: 'createdAt'
};

exports.Prisma.StuntingScalarFieldEnum = {
  id: 'id',
  wargaId: 'wargaId',
  tanggal: 'tanggal',
  bb: 'bb',
  tb: 'tb',
  umurBulan: 'umurBulan',
  zScore: 'zScore',
  kategori: 'kategori',
  rekomendasi: 'rekomendasi',
  createdAt: 'createdAt'
};

exports.Prisma.PengurusScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  nama: 'nama',
  jabatan: 'jabatan',
  bidang: 'bidang',
  periode: 'periode',
  dokumen: 'dokumen',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ArsipAdatScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  kategori: 'kategori',
  tipe: 'tipe',
  url: 'url',
  tahun: 'tahun',
  narasumber: 'narasumber',
  lokasi: 'lokasi',
  statusReview: 'statusReview',
  createdAt: 'createdAt'
};

exports.Prisma.MusyawarahScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  tanggal: 'tanggal',
  keputusan: 'keputusan',
  risalahUrl: 'risalahUrl',
  statusSah: 'statusSah',
  createdAt: 'createdAt'
};

exports.Prisma.WilayahAdatScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  namaLayer: 'namaLayer',
  koordinat: 'koordinat',
  validasi: 'validasi',
  sengketa: 'sengketa',
  createdAt: 'createdAt'
};

exports.Prisma.HukumAdatScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  tipe: 'tipe',
  deskripsi: 'deskripsi',
  status: 'status',
  tanggalSidang: 'tanggalSidang',
  putusan: 'putusan',
  publik: 'publik',
  createdAt: 'createdAt'
};

exports.Prisma.AuditTrailScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  modul: 'modul',
  aksi: 'aksi',
  detail: 'detail',
  createdAt: 'createdAt'
};

exports.Prisma.NotifikasiScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  judul: 'judul',
  pesan: 'pesan',
  tipe: 'tipe',
  sudahDibaca: 'sudahDibaca',
  createdAt: 'createdAt'
};

exports.Prisma.LaporanScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  modul: 'modul',
  periode: 'periode',
  fileUrl: 'fileUrl',
  createdAt: 'createdAt'
};

exports.Prisma.ForumScalarFieldEnum = {
  id: 'id',
  kelasId: 'kelasId',
  judul: 'judul',
  createdAt: 'createdAt'
};

exports.Prisma.DiskusiScalarFieldEnum = {
  id: 'id',
  forumId: 'forumId',
  userId: 'userId',
  pesan: 'pesan',
  createdAt: 'createdAt'
};

exports.Prisma.ShiftNakesScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  namaNakes: 'namaNakes',
  hari: 'hari',
  jamMulai: 'jamMulai',
  jamSelesai: 'jamSelesai',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  warga: 'warga',
  pemerintah_desa: 'pemerintah_desa',
  lembaga_adat: 'lembaga_adat',
  nakes_posyandu: 'nakes_posyandu',
  guru_fasilitator: 'guru_fasilitator',
  admin_super: 'admin_super'
};

exports.JenisKelamin = exports.$Enums.JenisKelamin = {
  L: 'L',
  P: 'P'
};

exports.StatusWarga = exports.$Enums.StatusWarga = {
  Aktif: 'Aktif',
  Review: 'Review',
  Baru: 'Baru'
};

exports.ModulBelajar = exports.$Enums.ModulBelajar = {
  e_learning: 'e_learning',
  platform_pembelajaran: 'platform_pembelajaran',
  pusat_literasi: 'pusat_literasi',
  pelatihan_guru: 'pelatihan_guru',
  kelas_virtual: 'kelas_virtual'
};

exports.StatusKelas = exports.$Enums.StatusKelas = {
  Aktif: 'Aktif',
  Selesai: 'Selesai',
  Draft: 'Draft'
};

exports.TipeMateri = exports.$Enums.TipeMateri = {
  video: 'video',
  pdf: 'pdf',
  kuis: 'kuis'
};

exports.StatusTelemedicine = exports.$Enums.StatusTelemedicine = {
  Antrian: 'Antrian',
  Aktif: 'Aktif',
  Selesai: 'Selesai',
  Rujukan: 'Rujukan'
};

exports.KategoriStunting = exports.$Enums.KategoriStunting = {
  Normal: 'Normal',
  RisikoSedang: 'RisikoSedang',
  RisikoTinggi: 'RisikoTinggi'
};

exports.TipeArsip = exports.$Enums.TipeArsip = {
  dokumen: 'dokumen',
  foto: 'foto',
  video: 'video'
};

exports.TipeHukumAdat = exports.$Enums.TipeHukumAdat = {
  Aturan: 'Aturan',
  Kasus: 'Kasus',
  Putusan: 'Putusan'
};

exports.Prisma.ModelName = {
  User: 'User',
  Desa: 'Desa',
  RwRt: 'RwRt',
  Warga: 'Warga',
  Kelas: 'Kelas',
  Materi: 'Materi',
  PesertaKelas: 'PesertaKelas',
  Tugas: 'Tugas',
  RekamMedis: 'RekamMedis',
  Telemedicine: 'Telemedicine',
  MonitoringKesehatan: 'MonitoringKesehatan',
  Posyandu: 'Posyandu',
  Stunting: 'Stunting',
  Pengurus: 'Pengurus',
  ArsipAdat: 'ArsipAdat',
  Musyawarah: 'Musyawarah',
  WilayahAdat: 'WilayahAdat',
  HukumAdat: 'HukumAdat',
  AuditTrail: 'AuditTrail',
  Notifikasi: 'Notifikasi',
  Laporan: 'Laporan',
  Forum: 'Forum',
  Diskusi: 'Diskusi',
  ShiftNakes: 'ShiftNakes'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
