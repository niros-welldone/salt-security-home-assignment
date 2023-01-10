import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import {TableFilters, Group} from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TableWrapper = styled.div`
  margin-top: 20px;
  background-color: ${({theme: {colors: {white}}}) => white};
  padding: 12px;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({theme: {colors: {brightGray}}}) => brightGray};
  div {
    font-size: 13px;
    font-weight: bold;
    color: ${({theme: {colors: {deepFuchsia}}}) => deepFuchsia};
  }
`

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`

const Cell = styled.div`
  display: flex;
  flex: 1;
  padding: 12px;
  max-width: ${({width}) => width};
`

const TableRow = styled.div`
  display: ${({isVisible}) => (isVisible ? 'flex' : 'none')};
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 2px 6px 2px;
  margin: 12px 0;
`

const NameColumn = styled.div`
  font-size: 14px;
  color: ${({theme: {colors: {coolBlack}}}) => coolBlack};
`

const TypeColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 28px;
  font-size: 13px;
  font-weight: bold;
  background-color: ${({theme: {colors: {columbiaBlue}}}) => columbiaBlue};
  color: ${({theme: {colors: {moonstone}}}) => moonstone};
  text-transform: uppercase;
`

const PIIButton = styled(TypeColumn)`
  border: 2px solid ${({theme: {colors: {coolBlack}}}) => coolBlack};
  background-color: ${({checked, theme: {colors: {coolBlack, white}}}) => (checked ? coolBlack : white)};
  color: ${({checked, theme: {colors: {coolBlack, white}}}) => (checked ? white : coolBlack)};
  
  cursor: pointer;
  opacity: .8;
`

const MaskingButton = styled(TypeColumn)`
  border: 2px solid ${({theme: {colors: {metallicViolet}}}) => metallicViolet};
  background-color: ${({checked, theme: {colors: {metallicViolet, white}}}) => (checked ? metallicViolet : white)};
  color: ${({checked, theme: {colors: {metallicViolet, white}}}) => (checked ? white : metallicViolet)};
  cursor: pointer;
  opacity: .8;
`

const columns = {
  name: {
    title: 'NAME',
    renderer: (value) => <NameColumn>{value}</NameColumn>
  },
  pii: {
    title: 'PII',
    width: '10vw',
    renderer: (value, onToggleButton) => <PIIButton checked={value} onClick={onToggleButton}>PII</PIIButton>
  },
  masked: {
    title: 'MASKING',
    renderer: (value, onToggleButton) => <MaskingButton checked={value} onClick={onToggleButton}>MASKED</MaskingButton>
  },
  type: {
    title: 'TYPE',
    renderer: (value) => <TypeColumn>{value}</TypeColumn>
  },
}

const Table = ({data, context}) => {
  const defaultFilters = useMemo(() => ({search: '', isPII: false}), []);
  const [filters, setFilters] = useState(defaultFilters);
  const [tableData, setTableData] = useState(data);

  const onToggleButton = useCallback((group, index, field) => {
    const newData = JSON.parse(JSON.stringify(tableData));
    newData[group][index][field] = !newData[group][index][field];
    setTableData(newData);
  }, [tableData])

  const onFilter = useCallback(({name, pii, type}) => {
    const searchFilter = `${name}${type}`.toLowerCase().includes(filters.search.toLowerCase());
    const piiFilter = !filters.isPII || pii;
    return searchFilter && piiFilter;
  }, [filters]);

  return (
      <Container>
        <TableFilters {...{defaultFilters, filters, setFilters, context}} />
        <TableWrapper>
          <TableHeader>
            {Object.keys(columns).map((key) => (
                <Cell key={key} width={columns[key].width}>{columns[key].title}</Cell>
            ))}
          </TableHeader>
          <TableBody>
            {Object.keys(tableData).map((key) => (
                <Group key={key} title={key}>
                  {tableData[key].map((tr, index) => (
                      <TableRow key={index} isVisible={onFilter(tr)}>
                        {Object.keys(tr).map((field) => (
                            <Cell key={field} width={columns[field].width}>
                              {columns[field].renderer(tr[field], () => onToggleButton(key, index, field))}
                            </Cell>
                        ))}
                      </TableRow>
                  ))}
                </Group>
            ))}
          </TableBody>
        </TableWrapper>
      </Container>
  );
}

export default Table;
