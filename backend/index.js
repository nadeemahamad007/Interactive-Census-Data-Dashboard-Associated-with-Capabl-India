const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const states = [{ code: 'MH', name: 'Maharashtra' }, { code: 'KA', name: 'Karnataka' }];
const districts = { MH: [{ code: 'PUN', name: 'Pune' }, { code: 'MUM', name: 'Mumbai' }], KA: [{ code: 'BLR', name: 'Bangalore' }] };
const censusData = {
    PUN: { population: [{ ageGroup: '0-14', count: 500000 }, { ageGroup: '15-24', count: 300000 }, { ageGroup: '25-64', count: 700000 }, { ageGroup: '65+', count: 200000 }], literacyRate: 85.5 }
};

app.get('/api/states', (req, res) => res.json(states));
app.get('/api/districts', (req, res) => res.json(districts[req.query.stateCode]));
app.get('/api/census', (req, res) => res.json(censusData[req.query.districtCode]));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
