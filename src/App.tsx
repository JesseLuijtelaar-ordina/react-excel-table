import React from 'react';
import Uploader from './components/uploadCard';
import Table from './components/table';
import { TableRowInterface } from './interfaces/row.interface';
import { StateInterface } from './interfaces/state.interface';

class App extends React.Component {
  public state: StateInterface = {
    rows: []
  }

  /**
   * Set rows inside state
   * @param rows TableRowInterface
   */
  public setRows(rows: TableRowInterface[]): void {
    this.setState({ rows: rows });
  }

  /**
   * Shows an error message in an alert box
   * @param error Message to display
   */
  public onError(error: string): void {
    alert(error);
  }

  public render() {
    return (
      <div className='wrapper'>
        <Uploader onUpdate={this.setRows.bind(this)}  onError={this.onError}/>
        { this.state.rows.length !== 0 && <Table rows={this.state.rows} /> }
      </div>
    );
  }
}

export default App
