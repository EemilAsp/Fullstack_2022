import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  // This will be either /notes or / persons
  const [resources, setResources] = useState([]);

  useEffect(() => {
    //getall
    getAll();
  }, [baseUrl]);

  //Get all object from the baseurl api
  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  //Post new object to the api, resource is the new "object"
  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
  };

  const services = {
    create,
  };

  return [resources, services];
};

export default useResource;
