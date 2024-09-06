package com.cpi.is.dao;

import java.util.List;

import com.cpi.is.entity.RawMaterialListEntity;

public interface RawMaterialListDAO {
	
	List<RawMaterialListEntity>  getRawMaterialList(Integer targetBranchId) throws Exception;
	String saveRawMaterial(RawMaterialListEntity item) throws Exception;
	String deleteRawMaterial(RawMaterialListEntity item) throws Exception;
}
