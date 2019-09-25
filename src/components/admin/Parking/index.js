import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../utils/api';
import DynamicTable from '../../shared/DynamicTable';
import SpotDataForm from './SpotDataForm';

const tableColumns = [
  { id: 'level', type: 'string', label: 'Level' },
  { id: 'number', type: 'string', label: 'Number' },
  { id: 'rating', type: 'number', label: 'Rating' },
  { id: 'isFree', type: 'boolean', label: 'Is Free?' }
];
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  }
}));

export default function SpotsTable() {
  const classes = useStyles();
  const [spots, setSpots] = React.useState([]);
  const [selectedSpot, setSelectedSpot] = React.useState(null);
  const [isAddSpotOpen, setAddSpotOpen] = React.useState(false);

  function onSpotAdded(user) {
    setSpots([user, ...spots]);
  }

  function onSpotEdited(user) {
    Object.assign(selectedSpot, user);
    setSelectedSpot(null);
  }

  React.useEffect(() => {
    api.listSpots().then(spots => {
      setSpots(spots);
    });
  }, []);

  return (
    <div className={classes.root}>
      <DynamicTable
        cols={tableColumns}
        rows={spots}
        selectedRow={selectedSpot}
        onAddRowClicked={() => {
          setSelectedSpot(null);
          setAddSpotOpen(true);
        }}
        onDeleteRowClicked={() => { }}
        onEditRowClicked={() => { setAddSpotOpen(true); }}
        onSelectionChange={setSelectedSpot}
      />
      <SpotDataForm
        isOpen={isAddSpotOpen}
        spot={selectedSpot}
        onFormClose={() => setAddSpotOpen(false)}
        onSpotAdded={(spot) => {
          setAddSpotOpen(false);
          onSpotAdded(spot);
        }}
        onSpotEdited={(spot) => {
          setAddSpotOpen(false);
          onSpotEdited(spot);
        }}
      />

    </div>
  );
}
