import * as React from 'react';

export class UserDrugEditDateOpened extends React.Component {

    state = {
        year: this.props.drug.dateOpened.getFullYear(),
        month: this.props.drug.dateOpened.getMonth(),
        day: this.props.drug.dateOpened.getDay()
    }

    format2Digits(num) {
        return (num > 9 ? num : '0' + num)
    }

    formatDate(date) {
        let year = date.getFullYear();
        let month = this.format2Digits(date.getMonth());
        let day = this.format2Digits(date.getDate());
        return year + '-' + month + '-' + day;
    }

    handleSubmit = (event) => {
        let newDateOpened = new Date(this.state.year, this.state.month, this.state.day);
        let oldUserDrug = this.props.drug;
        let newUserDrug = { ...oldUserDrug, dateOpened: newDateOpened, isOpened: true, isEditing: false };
        event.preventDefault();
        this.props.drugEdited(newUserDrug);
    }

    handleInputChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h1> Date Opened (yyyy/mm/dd) </h1>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" name="year" cols="4" rows="1" defaultValue={this.state.year} onChange={this.handleInputChange} />
                        -
                        <input type="number" name="month" cols="2" rows="1" defaultValue={this.format2Digits(this.state.month)} onChange={this.handleInputChange} />
                        -
                        <input type="number" name="day" cols="2" rows="1" defaultValue={this.format2Digits(this.state.day)} onChange={this.handleInputChange} />
                        <input type="submit" value="Submit" />
                    </form>
                </div >
            </div>
        );
    }
}