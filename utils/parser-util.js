export const resolveDataSourceName = (dataSource) => {
    const dataSourceDetail = { ...dataSource.dataSourceDetail }
      switch(dataSource.category) {
        case 'WARGA':
            return `RT ${dataSourceDetail.rt} RW ${dataSourceDetail.rw} Kelurahan ${dataSourceDetail.village}`;
        case 'INSTITUSI':
            return `${dataSourceDetail.name} Kelurahan ${dataSourceDetail.village}`;
        case 'PEKERJA':
            return `${dataSourceDetail.profession} ${dataSourceDetail.location}`;
    }
    return 'NOT DEFINE'
}
