export const resolveDataSourceName = (dataSource) => {
    const dataSourceDetail = { ...dataSource.dataSourceDetail }
    console.log(dataSource.category)
      switch(dataSource.category) {
        case 'WARGA':
            return `RT ${dataSourceDetail.rt} RW ${dataSourceDetail.rw} ${dataSourceDetail.village}`;
        case 'INSTITUSI':
            return `${dataSourceDetail.name} ${dataSourceDetail.village}`;
        case 'PEKERJA':
            return `${dataSourceDetail.profession} ${dataSourceDetail.location}`;
    }
    return 'NOT DEFINE'
}
