import PropTypes from 'prop-types';
const GenderCheckbox = (props) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${props.selectedGender==='male'?'selected':""}`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-400' 
						checked={props.selectedGender === 'male'}
						onChange={() => props.onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${props.selectedGender==='female'?'selected':""}`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-400'
						checked={props.selectedGender === 'female'}
						onChange={() => props.onCheckboxChange('female')}
					/>
				</label>
			</div>
		</div>
	);
};


GenderCheckbox.propTypes = {
	selectedGender: PropTypes.string.isRequired,
	onCheckboxChange: PropTypes.func.isRequired,
};

export default GenderCheckbox;