class App extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          data: [
              {'id':1,1:'',2:'Class1',3:'Class2',4:'Class3',5:'Class4',6:'Class5',7:'Class6'},
              {'id':2,1:'MONDAY',2:'1',3:'2',4:'3',5:'4',6:'5',7:'6'},
              {'id':3,1:'TUESDAY',2:'1',3:'2',4:'3',5:'4',6:'5',7:'6'},
              {'id':4,1:'WEDNESDAY',2:'1',3:'2',4:'3',5:'4',6:'5',7:'6'},
              {'id':5,1:'THURSDAY',2:'1',3:'2',4:'3',5:'4',6:'5',7:'6'},
              {'id':6,1:'FRIDAY',2:'1',3:'2',4:'3',5:'4',6:'5',7:'6'}
          ],
          errorInput:''
      };

      this.submitStepSignupForm = this.submitStepSignupForm.bind(this);
      this.appendColumn = this.appendColumn.bind(this);
      //  this.editColumn = this.editColumn.bind(this);

  render(){

      let tableStyle = {
          align:"center"
      };
      let list = this.state.data.map(row =>{
          return (
              <tr className="grey2" key={row.id}>
                  {Object.keys(row).filter(key => key !== 'id').map(key => {
                      return (
                          <td className="grey1" key={row.id+''+key}>
                              <div suppressContentEditableWarning="true" contentEditable="true" value={key} onInput={this.editColumn.bind(this,{row},{key})}>
                                {row[key]}
                              </div>
                          </td>
                      );
                  })}
              </tr>
            );
          });
          return (
              <fieldset className="step-4">
                  <div className="heading">
                      <h3>Tell us about your schedule</h3>
                      <p>Dynamic Data Table by Rohan Arihant </p>
                  </div>
                  <div className="schedule padd-lr">
                      <table cellSpacing="3" id="mytable" style={tableStyle}>
                          <tbody>{list}</tbody>
                      </table>
                  </div>
            </fieldset>
          );
          }