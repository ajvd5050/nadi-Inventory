package com.cpi.is.service.inventory;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.cpi.is.entity.inventory.RawMaterialListEntity;

public interface RawMaterialListService {

	List<RawMaterialListEntity>  getRawMaterialList(HttpServletRequest request) throws Exception;
	String deleteRawMaterial(HttpServletRequest request) throws Exception;
	String saveRawMaterial(HttpServletRequest request, HttpSession session) throws Exception;
}