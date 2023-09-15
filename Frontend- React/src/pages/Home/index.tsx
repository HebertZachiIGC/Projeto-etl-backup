import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.module.css';
import apiAuthenticated from '../../services/api.authenticated';

interface dataProps {
  id: number;
  Buyer: string;
  ClientSubSector: string;
  NDeals: number;
  NumberOfNDAPerBuyerInSubSector: number;
  NumberOfGosPerBuyerInSubSector: number;
  NumberOfGosPerSizeInSubSector: number;
  NumberOfNBOperDealsInSubSector: number;
  AverageSizePerDealInSubSector: number;
  MedianSizePerDealInSubSector: number;
  NBOLastDatePerDealInSubSector: number;
  DealClosePerClientSector: number;
  LastDateCloseDealPerInSubSector: number;
  MostRecentContact: number;
  IsEqual: boolean;
}

const Home: React.FC = () => {
  const [target, setTarget] = useState<dataProps[]>([]);
  const [selectList, setSelectList] = useState<string[]>([]);

  const getTargetData = async () => {
    try {
      const { data } = await apiAuthenticated.get('/auth/target');
      setTarget(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTargetData();
  }, []);

  useEffect(() => {
    const getClientSubSector = async () => {
      try {
        const { data } = await apiAuthenticated.get('/auth/targetClient');
        setSelectList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getClientSubSector();
  }, []);

  // const handleSelect = (event) => {
  //   const valorSelecionado = event.target.value;
  //   setSelect(valorSelecionado);

  // };

  const handleSelect = async (filterValue: string) => {
    const getAllClientSubSector = async () => {
      try {
        console.log(filterValue);
        const { data } = await apiAuthenticated.get(
          `/auth/target2?ClientSubSector=${filterValue}`
        );
        console.log(data);
        setTarget(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllClientSubSector();
  };

  return (
    <div>
      <h1>Home</h1>
      <br />

      <Form.Select
        onChange={({ target }) => {
          const filterValue = target.value;

          if (!filterValue) return getTargetData();

          return handleSelect(filterValue);
        }}
        aria-label="Default select example"
      >
        <option value={''}>All Data</option>
        {selectList.map((select, index) => (
          <option value={select} key={index}>
            {select}
          </option>
        ))}
      </Form.Select>

      <br />
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>Buyer</th>
            <th>ClientSubSector</th>
            <th>NumberOfNDAPerBuyer</th>
            <th>NumberOfGosPerBuyer</th>
            <th>NumberOfGosPerSize</th>
            <th>NumberOfNBOperDeals</th>
            <th>AverageSizePerDeal</th>
            <th>NBOLastDatePerDeal</th>
            <th>MedianSizePerDeal</th>
            <th>DealClosePerClientSector</th>
            <th>LastDateCloseDealPer</th>
            <th>MostRecentContact</th>
            <th>IsEqual</th>
          </tr>
        </thead>
        <tbody>
          {target.map((i) => (
            <tr key={i.id}>
              <td>
                <span>{i.id}</span>
              </td>
              <td>
                <span>{i.Buyer}</span>
              </td>
              <td>
                <span>{i.ClientSubSector}</span>
              </td>
              <td>
                <span>{i.NDeals}</span>
              </td>
              <td>
                <span>{i.NumberOfNDAPerBuyerInSubSector}</span>
              </td>
              <td>
                <span>{i.NumberOfGosPerBuyerInSubSector}</span>
              </td>
              <td>
                <span>{i.NumberOfGosPerSizeInSubSector}</span>
              </td>
              <td>
                <span>{i.NumberOfNBOperDealsInSubSector}</span>
              </td>
              <td>
                <span>{i.AverageSizePerDealInSubSector}</span>
              </td>
              <td>
                <span>{i.MedianSizePerDealInSubSector}</span>
              </td>
              <td>
                <span>{i.NBOLastDatePerDealInSubSector}</span>
              </td>
              <td>
                <span>{i.DealClosePerClientSector}</span>
              </td>
              <td>
                <span>{i.LastDateCloseDealPerInSubSector}</span>
              </td>
              <td>
                <span>{i.MostRecentContact}</span>
              </td>
              <td>
                <span>{i.IsEqual}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <br />
    </div>
  );
};

export default Home;
