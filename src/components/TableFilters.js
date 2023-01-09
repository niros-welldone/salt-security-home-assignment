import React, {useCallback, useMemo, useState} from 'react';
import styled, {css} from 'styled-components';
import {FaSearch} from 'react-icons/fa'

const hover = css`
  cursor: pointer;
  :hover {
    opacity: .8;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputWrapper = styled.div`
  display: flex;
  background-color: ${({theme: {colors: {white}}}) => white};
  align-items: center;
  height: 60px;
  svg {
    fill: ${({theme: {colors: {graniteGrey}}}) => graniteGrey};
    margin: 0 12px;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  height: calc(100% - 2px);
  display: flex;
  flex: 1;
`

const Separator = styled.div`
  height: 70%;
  width: 1px;
  background-color: ${({theme: {colors: {brightGray}}}) => brightGray};
  margin: 12px;
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: ${({theme: {colors: {graniteGrey}}}) => graniteGrey};
  input, label {
    cursor: pointer;
  }
  ${hover};
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({isDiff, theme: {colors: {metallicViolet, graniteGrey}}}) => (isDiff ? metallicViolet : graniteGrey)};
  color: ${({theme: {colors: {white}}}) => white};
  height: 100%;
  padding: 0 30px;
  pointer-events: ${({isDiff}) => (isDiff ? 'auto' : 'none')};
  transition: background-color .5s;
  ${hover};
`

const LinkButton = styled.div`
  color: ${({theme: {colors: {metallicViolet}}}) => metallicViolet};
  align-self: flex-end;
  margin-top: 5px;
  cursor: pointer;
  ${hover};
`

const TableFilters = ({defaultFilters, filters, setFilters}) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const isDiff = useMemo(() => (JSON.stringify(filters) !== JSON.stringify(tempFilters)), [filters, tempFilters]);

  const onFilterChange = useCallback((v, k) => {
    setTempFilters({...tempFilters, [k]: v});
  }, [tempFilters]);

  const onApply = useCallback(() => {
    setFilters(tempFilters);
  }, [setFilters, tempFilters]);

  const onReset = useCallback(() => {
    setFilters(defaultFilters);
    setTempFilters(defaultFilters);
  }, [setFilters, defaultFilters]);

  return (
      <Container>
        <InputWrapper>
          <FaSearch />
          <Input placeholder="Search" value={tempFilters.search} onChange={({target: {value}}) => onFilterChange(value, 'search')} />
          <Separator />
          <CheckboxWrapper>
            <input type="checkbox" id="pii" checked={tempFilters.isPII} onChange={({target: {checked}}) => onFilterChange(checked, 'isPII')} />
            <label htmlFor="pii">Show PII only</label>
          </CheckboxWrapper>
          <Button onClick={onApply} isDiff={isDiff}>Apply</Button>
        </InputWrapper>
        <LinkButton onClick={onReset}>Reset Filter</LinkButton>
      </Container>
  )
}

export default TableFilters;
