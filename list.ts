users$!: Observable<any>;

ngOnInit(): void {
  this.store.dispatch(userActions.ShowAllUsersAction({payload: 1}));   
  this.users$ = this.store.select(userReducer.getUsers);

  this.store.select(userReducer.getUsers)

} 

paginateHandler(pageNo:number):void {
  this.store.dispatch(userActions.ShowAllUsersAction({payload: pageNo}));   
  this.users$ = this.store.select(userReducer.getUsers);
}