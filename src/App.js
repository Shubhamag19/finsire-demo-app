import React, { useEffect, useState } from 'react';
import firebase from './firebase';

import DataTable from './DataTable';

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('demo-data');

  function getData() {
    setLoading(true);
    ref.onSnapshot(querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });
      setNumbers(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return 'Loading...';

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Demo App</h1>  
        <DataTable numbers={numbers} />
    </div>
  )
}

export default App;