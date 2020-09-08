import React from 'react';
import { useRouter } from 'next/router';
import NavigationBar from './NavigationBar';

export default function({ user }){
  const router = useRouter();

  return (
    <NavigationBar
      name={user.name}
      role={user.role}
      menuPenyaluranZakat={'Penyaluran Zakat'}
      submenuPenyaluranZakat={[
        'Data Mustahik',
        'Sumber Data Mustahik'
      ]}
      menuTransaksiZakat={'Transaksi Zakat'}
      submenuTransaksiZakat={[
        'Data Transaksi', 
        'Data Muzaki'
      ]}
      onMenuClicked={(submenuPenyaluranZakat) => {
        if (submenuPenyaluranZakat === 'Data Mustahik') {
          router.push('/daftar/mustahik');
        } else if (submenuPenyaluranZakat === 'Sumber Data Mustahik') {
          router.push('/daftar/sumber-data-mustahik');
        }
      }}
      onMenuClicked={(submenuTransaksiZakat) => {
        if (submenuTransaksiZakat === 'Data Transaksi') {
          router.push('/tambah/sumber-data-mustahik/pekerja');
        } else if (submenuTransaksiZakat === 'Data Muzaki') {
          router.push('/daftar/sumber-data-mustahik');
        }
      }}
    />
  )
}
