import React from "react";
import { Table } from "semantic-ui-react";
import { map } from "lodash";

export const ComponentInfo = React.memo(
  ({ knobs, selectedComponentId, pedalDetails, dispatch }) => {
    // default to showing pedal info
    const selectedComponent = selectedComponentId
      ? knobs.find(knob => {
          return knob.id === selectedComponentId;
        })
      : pedalDetails;
    return (
      <Table size="small" style={{ margin: "10px 10px 10px 0" }} unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Key</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(selectedComponent, (value, key) => {
            return (
              <Table.Row key={Math.random()}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
);
