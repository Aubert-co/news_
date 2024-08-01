import { waitFor,renderHook } from "@testing-library/react";
import { fetchData } from "./index";

let mockService , mockSetState 

describe('usefetchData', () => {
  beforeEach(()=>{
    mockService = jest.fn().mockReturnValue({datas:'value',status:200})
    mockSetState = jest.fn();
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: (initialState) => [initialState, mockSetState],
}));
  })
  it('should fetch and update data', async () => {
    const body ={product_id:37,name:'lucas'}
   
    const {rerender} = renderHook(() =>
      fetchData({service:mockService, body,setItems:mockSetState})
    );
    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledTimes(1)
      expect(mockSetState).toHaveBeenCalledWith({datas:'value',status:200})
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith({body})
    });
    rerender({service:mockService,body,mockSetState})

    await waitFor(()=>{
      expect(mockSetState).toHaveBeenCalledTimes(2)
      
    })

  });

});
