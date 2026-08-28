
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
  username: 'username',
  password: 'password',
  role: 'role',
  status: 'status',
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

exports.Prisma.DimensiScalarFieldEnum = {
  id: 'id',
  frameworkId: 'frameworkId',
  nama: 'nama',
  deskripsi: 'deskripsi',
  bobot: 'bobot',
  urutan: 'urutan',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IndikatorScalarFieldEnum = {
  id: 'id',
  dimensiId: 'dimensiId',
  nama: 'nama',
  deskripsi: 'deskripsi',
  satuan: 'satuan',
  targetNilai: 'targetNilai',
  bobot: 'bobot',
  tipe: 'tipe',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NilaiIndikatorScalarFieldEnum = {
  id: 'id',
  indikatorId: 'indikatorId',
  desaId: 'desaId',
  periode: 'periode',
  nilai: 'nilai',
  sumber: 'sumber',
  catatan: 'catatan',
  status: 'status',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BuktiDataScalarFieldEnum = {
  id: 'id',
  nilaiIndikatorId: 'nilaiIndikatorId',
  judul: 'judul',
  tipe: 'tipe',
  fileUrl: 'fileUrl',
  keterangan: 'keterangan',
  uploadedBy: 'uploadedBy',
  statusReview: 'statusReview',
  reviewedBy: 'reviewedBy',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt'
};

exports.Prisma.ProgramDesaScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  namaProgram: 'namaProgram',
  deskripsi: 'deskripsi',
  bidang: 'bidang',
  anggaranTotal: 'anggaranTotal',
  sumberDana: 'sumberDana',
  periode: 'periode',
  statusProgram: 'statusProgram',
  prioritas: 'prioritas',
  penanggungJawab: 'penanggungJawab',
  targetCapaian: 'targetCapaian',
  tanggalMulai: 'tanggalMulai',
  tanggalSelesai: 'tanggalSelesai',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KeputusanProgramScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  musyawarahId: 'musyawarahId',
  programDesaId: 'programDesaId',
  nomorKeputusan: 'nomorKeputusan',
  judulKeputusan: 'judulKeputusan',
  isiKeputusan: 'isiKeputusan',
  tanggalKeputusan: 'tanggalKeputusan',
  statusSah: 'statusSah',
  disetujuiOleh: 'disetujuiOleh',
  catatan: 'catatan',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PersetujuanAksesScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  modul: 'modul',
  aksesLevel: 'aksesLevel',
  disetujuiOleh: 'disetujuiOleh',
  alasan: 'alasan',
  status: 'status',
  berlakuHingga: 'berlakuHingga',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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

exports.Prisma.AspirasiScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  wargaId: 'wargaId',
  kategori: 'kategori',
  judul: 'judul',
  isi: 'isi',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.SiswaScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  nisn: 'nisn',
  nama: 'nama',
  kelas: 'kelas',
  jenjang: 'jenjang',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.MonitoringDesaScalarFieldEnum = {
  id: 'id',
  namaDesa: 'namaDesa',
  kecamatan: 'kecamatan',
  index: 'index',
  readiness: 'readiness',
  maturity: 'maturity',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.MasterDesaRecordScalarFieldEnum = {
  id: 'id',
  kodeDesa: 'kodeDesa',
  nama: 'nama',
  kecamatan: 'kecamatan',
  kabupaten: 'kabupaten',
  provinsi: 'provinsi',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModuleRecordScalarFieldEnum = {
  id: 'id',
  modulePath: 'modulePath',
  moduleName: 'moduleName',
  title: 'title',
  category: 'category',
  description: 'description',
  valueText: 'valueText',
  valueBlob: 'valueBlob',
  status: 'status',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UmkmScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  nama: 'nama',
  pemilik: 'pemilik',
  bidang: 'bidang',
  omset: 'omset',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterFrameworkScalarFieldEnum = {
  id: 'id',
  namaFramework: 'namaFramework',
  dimensi: 'dimensi',
  indikator: 'indikator',
  bobot: 'bobot',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FrameworkVersioningScalarFieldEnum = {
  id: 'id',
  versi: 'versi',
  tanggal: 'tanggal',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ManajemenPeriodeScalarFieldEnum = {
  id: 'id',
  tahun: 'tahun',
  semester: 'semester',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ValidasiDataScalarFieldEnum = {
  id: 'id',
  namaDataset: 'namaDataset',
  jumlahData: 'jumlahData',
  statusValidasi: 'statusValidasi',
  tanggalUpload: 'tanggalUpload',
  createdAt: 'createdAt'
};

exports.Prisma.IntegrasiDataDesaScalarFieldEnum = {
  id: 'id',
  namaSumber: 'namaSumber',
  tipe: 'tipe',
  apiEndpoint: 'apiEndpoint',
  status: 'status',
  terakhirSinkronisasi: 'terakhirSinkronisasi',
  createdAt: 'createdAt'
};

exports.Prisma.GovernanceManagementScalarFieldEnum = {
  id: 'id',
  namaGovernance: 'namaGovernance',
  kategori: 'kategori',
  deskripsi: 'deskripsi',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DSSKnowledgeBaseScalarFieldEnum = {
  id: 'id',
  namaRule: 'namaRule',
  kategori: 'kategori',
  bobot: 'bobot',
  aturan: 'aturan',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EvaluasiArtefakScalarFieldEnum = {
  id: 'id',
  namaArtefak: 'namaArtefak',
  jenis: 'jenis',
  nilaiEvaluasi: 'nilaiEvaluasi',
  kategori: 'kategori',
  tanggalEvaluasi: 'tanggalEvaluasi',
  createdAt: 'createdAt'
};

exports.Prisma.ExpertValidationScalarFieldEnum = {
  id: 'id',
  namaValidator: 'namaValidator',
  keahlian: 'keahlian',
  artefakDivalidasi: 'artefakDivalidasi',
  nilaiValiditas: 'nilaiValiditas',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.UATResultScalarFieldEnum = {
  id: 'id',
  namaUser: 'namaUser',
  role: 'role',
  susScore: 'susScore',
  kategori: 'kategori',
  feedback: 'feedback',
  tanggal: 'tanggal',
  createdAt: 'createdAt'
};

exports.Prisma.ResearchRepositoryScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  jenis: 'jenis',
  penulis: 'penulis',
  tahun: 'tahun',
  ukuran: 'ukuran',
  tanggalUpload: 'tanggalUpload',
  createdAt: 'createdAt'
};

exports.Prisma.KonfigurasiSistemScalarFieldEnum = {
  id: 'id',
  namaSistem: 'namaSistem',
  versiSistem: 'versiSistem',
  urlSistem: 'urlSistem',
  emailAdmin: 'emailAdmin',
  deskripsiSistem: 'deskripsiSistem',
  maxUploadSize: 'maxUploadSize',
  sessionTimeout: 'sessionTimeout',
  maintenanceMode: 'maintenanceMode',
  backupOtomatis: 'backupOtomatis',
  backupSchedule: 'backupSchedule',
  notifikasiEmail: 'notifikasiEmail',
  notifikasiSms: 'notifikasiSms',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PengaturanNotifikasiScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  isi: 'isi',
  target: 'target',
  tanggalKirim: 'tanggalKirim',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.DatasetAssessmentScalarFieldEnum = {
  id: 'id',
  namaDataset: 'namaDataset',
  lokasi: 'lokasi',
  jumlahSampel: 'jumlahSampel',
  tanggalUpload: 'tanggalUpload',
  status: 'status',
  deskripsi: 'deskripsi',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StatistikPenelitianScalarFieldEnum = {
  id: 'id',
  datasetId: 'datasetId',
  jenisStatistik: 'jenisStatistik',
  hasil: 'hasil',
  tanggalAnalisis: 'tanggalAnalisis',
  createdAt: 'createdAt'
};

exports.Prisma.VisualisasiDataScalarFieldEnum = {
  id: 'id',
  datasetId: 'datasetId',
  jenisGrafik: 'jenisGrafik',
  konfigurasi: 'konfigurasi',
  tanggal: 'tanggal',
  createdAt: 'createdAt'
};

exports.Prisma.SDGsDashboardScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  sdg3Score: 'sdg3Score',
  sdg4Score: 'sdg4Score',
  sdg18Score: 'sdg18Score',
  periode: 'periode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PublikasiSitasiScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  penulis: 'penulis',
  jurnal: 'jurnal',
  tahun: 'tahun',
  doi: 'doi',
  sitasiCount: 'sitasiCount',
  url: 'url',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LaporanPenelitianScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  jenis: 'jenis',
  periode: 'periode',
  fileUrl: 'fileUrl',
  tanggal: 'tanggal',
  createdAt: 'createdAt'
};

exports.Prisma.JadwalKesehatanScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  kategori: 'kategori',
  tanggal: 'tanggal',
  waktu: 'waktu',
  lokasi: 'lokasi',
  deskripsi: 'deskripsi',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EdukasiKesehatanScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  kategori: 'kategori',
  tipe: 'tipe',
  url: 'url',
  deskripsi: 'deskripsi',
  target: 'target',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KelasDesaScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  nama: 'nama',
  kategori: 'kategori',
  jadwal: 'jadwal',
  kuota: 'kuota',
  peserta: 'peserta',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PelatihanOnlineScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  deskripsi: 'deskripsi',
  tipe: 'tipe',
  url: 'url',
  durasi: 'durasi',
  sertifikasi: 'sertifikasi',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SertifikasiScalarFieldEnum = {
  id: 'id',
  wargaId: 'wargaId',
  pelatihanId: 'pelatihanId',
  nilai: 'nilai',
  tanggal: 'tanggal',
  fileUrl: 'fileUrl',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.RiwayatPelatihanScalarFieldEnum = {
  id: 'id',
  wargaId: 'wargaId',
  pelatihanId: 'pelatihanId',
  tanggalMulai: 'tanggalMulai',
  tanggalSelesai: 'tanggalSelesai',
  progress: 'progress',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InformasiAdatScalarFieldEnum = {
  id: 'id',
  judul: 'judul',
  kategori: 'kategori',
  konten: 'konten',
  gambar: 'gambar',
  penulis: 'penulis',
  tanggal: 'tanggal',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KalenderAdatScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  namaAcara: 'namaAcara',
  tanggal: 'tanggal',
  deskripsi: 'deskripsi',
  lokasi: 'lokasi',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ArsipBudayaScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  kategori: 'kategori',
  tipe: 'tipe',
  url: 'url',
  deskripsi: 'deskripsi',
  tahun: 'tahun',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ForumDesaScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  kategori: 'kategori',
  pembuat: 'pembuat',
  konten: 'konten',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MusyawarahDigitalScalarFieldEnum = {
  id: 'id',
  desaId: 'desaId',
  judul: 'judul',
  agenda: 'agenda',
  tanggalMulai: 'tanggalMulai',
  tanggalSelesai: 'tanggalSelesai',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PartisipasiMusyawarahScalarFieldEnum = {
  id: 'id',
  musyawarahId: 'musyawarahId',
  wargaId: 'wargaId',
  statusPartisipasi: 'statusPartisipasi',
  tanggalPartisipasi: 'tanggalPartisipasi',
  createdAt: 'createdAt'
};

exports.Prisma.ProfilPenggunaScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  foto: 'foto',
  bio: 'bio',
  alamat: 'alamat',
  noHp: 'noHp',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RiwayatLayananScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  modul: 'modul',
  aktivitas: 'aktivitas',
  tanggal: 'tanggal',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.BantuanPanduanScalarFieldEnum = {
  id: 'id',
  kategori: 'kategori',
  pertanyaan: 'pertanyaan',
  jawaban: 'jawaban',
  urutan: 'urutan',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DashboardNasionalScalarFieldEnum = {
  id: 'id',
  totalDesa: 'totalDesa',
  totalWarga: 'totalWarga',
  avgReadiness: 'avgReadiness',
  avgMaturity: 'avgMaturity',
  avgQoL: 'avgQoL',
  slvIndex: 'slvIndex',
  sdg3Index: 'sdg3Index',
  sdg4Index: 'sdg4Index',
  sdg18Index: 'sdg18Index',
  periode: 'periode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DashboardPenelitianScalarFieldEnum = {
  id: 'id',
  totalDataset: 'totalDataset',
  totalArtefak: 'totalArtefak',
  avgReadiness: 'avgReadiness',
  avgMaturity: 'avgMaturity',
  avgQoL: 'avgQoL',
  slvIndex: 'slvIndex',
  periode: 'periode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DashboardLayananSLVScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  totalKesehatan: 'totalKesehatan',
  totalPendidikan: 'totalPendidikan',
  totalAdat: 'totalAdat',
  lastActivity: 'lastActivity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  admin_super: 'admin_super',
  operator_sid: 'operator_sid',
  bpd: 'bpd',
  dinas_pmd: 'dinas_pmd',
  peneliti: 'peneliti',
  layanan_slv: 'layanan_slv'
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
  Dimensi: 'Dimensi',
  Indikator: 'Indikator',
  NilaiIndikator: 'NilaiIndikator',
  BuktiData: 'BuktiData',
  ProgramDesa: 'ProgramDesa',
  KeputusanProgram: 'KeputusanProgram',
  PersetujuanAkses: 'PersetujuanAkses',
  Forum: 'Forum',
  Diskusi: 'Diskusi',
  ShiftNakes: 'ShiftNakes',
  Aspirasi: 'Aspirasi',
  Siswa: 'Siswa',
  MonitoringDesa: 'MonitoringDesa',
  MasterDesaRecord: 'MasterDesaRecord',
  ModuleRecord: 'ModuleRecord',
  Umkm: 'Umkm',
  MasterFramework: 'MasterFramework',
  FrameworkVersioning: 'FrameworkVersioning',
  ManajemenPeriode: 'ManajemenPeriode',
  ValidasiData: 'ValidasiData',
  IntegrasiDataDesa: 'IntegrasiDataDesa',
  GovernanceManagement: 'GovernanceManagement',
  DSSKnowledgeBase: 'DSSKnowledgeBase',
  EvaluasiArtefak: 'EvaluasiArtefak',
  ExpertValidation: 'ExpertValidation',
  UATResult: 'UATResult',
  ResearchRepository: 'ResearchRepository',
  KonfigurasiSistem: 'KonfigurasiSistem',
  PengaturanNotifikasi: 'PengaturanNotifikasi',
  DatasetAssessment: 'DatasetAssessment',
  StatistikPenelitian: 'StatistikPenelitian',
  VisualisasiData: 'VisualisasiData',
  SDGsDashboard: 'SDGsDashboard',
  PublikasiSitasi: 'PublikasiSitasi',
  LaporanPenelitian: 'LaporanPenelitian',
  JadwalKesehatan: 'JadwalKesehatan',
  EdukasiKesehatan: 'EdukasiKesehatan',
  KelasDesa: 'KelasDesa',
  PelatihanOnline: 'PelatihanOnline',
  Sertifikasi: 'Sertifikasi',
  RiwayatPelatihan: 'RiwayatPelatihan',
  InformasiAdat: 'InformasiAdat',
  KalenderAdat: 'KalenderAdat',
  ArsipBudaya: 'ArsipBudaya',
  ForumDesa: 'ForumDesa',
  MusyawarahDigital: 'MusyawarahDigital',
  PartisipasiMusyawarah: 'PartisipasiMusyawarah',
  ProfilPengguna: 'ProfilPengguna',
  RiwayatLayanan: 'RiwayatLayanan',
  BantuanPanduan: 'BantuanPanduan',
  DashboardNasional: 'DashboardNasional',
  DashboardPenelitian: 'DashboardPenelitian',
  DashboardLayananSLV: 'DashboardLayananSLV'
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
