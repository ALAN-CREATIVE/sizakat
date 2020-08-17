import React from 'react';
import { useRouter } from 'next/router';
import NavigationBar from './NavigationBar';

export default function({ user }){
  const router = useRouter();

  return (
    <NavigationBar
      name={user.name}
      role={user.role}
      menu={'Mustahik'}
      submenu={[
        'Data Mustahik',
        'Sumber Data Mustahik'
      ]}
      onMenuClicked={(submenu) => {
        if (submenu === 'Data Mustahik') {
          router.push('/daftar/mustahik');
        } else if (submenu === 'Sumber Data Mustahik') {
          router.push('/daftar/sumber-data-mustahik');
        }
      }}
    />
  )
}
