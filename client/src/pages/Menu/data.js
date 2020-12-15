// {/* <h3 className="menu__date">Sunday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Sunday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link>
//     <h3 className="menu__date">Monday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Monday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link>
//     <h3 className="menu__date">Tuesday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Tuesday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link>
//     <h3 className="menu__date">Wednesday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Wednesday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link>
//     <h3 className="menu__date">Thursday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Thursday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link>
//     <h3 className="menu__date">Friday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Friday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link>
//     <h3 className="menu__date">Saturday</h3>
// {this.state.myMeals&&this.state.myMeals.map(meal =>
// meal.date==='Saturday'&&meal.week===this.state.week&&
//     <li key={meal.id} className="card">
//         <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
//         <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
//             {meal.name}
//         </span>
//         {/* <span >
//             {`${meal.calories} cals`}
//         </span> */}
//         <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
//         <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
//             <img className="card__remove-icon" src={remove} alt="plus sign"/>
//         </span>
//     </li>
// )}
//     <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
//         <span className="menu__link-add">
//             <img className="menu__link-icon" src={plus} alt="plus sign"/>
//         </span>
//         <span className="menu__link-text">
//             Add another meal
//         </span>
//     </Link> */}